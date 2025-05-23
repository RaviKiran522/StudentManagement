using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using StudentResultDashBoard.Modals;

namespace StudentResultDashBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarksController : Controller
    {

        private readonly SchoolContext _context;

        public MarksController(SchoolContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> SaveMarks([FromBody] Mark mark)
        {
            _context.Marks.Add(mark);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(SaveMarks), new { rollno = mark.rollno }, mark);
        }

        [HttpGet("rollnumber/{rollNumber}")]
        public async Task<ActionResult<Student>> GetStudentByRollNumber(string rollNumber)
        {
            var student = await _context.Marks
                .FirstOrDefaultAsync(s => s.rollno == rollNumber);

            if (student == null)
            {
                return NotFound(); // 404 if not found
            }

            return Ok(student); // 200 OK with student data
        }

        [HttpPut("rollnumber/{rollNumber}")]
        public async Task<IActionResult> UpdateMarksByStudentRollNo(string rollNumber, [FromBody] Mark stuMarks)
        {
            var mark = await _context.Marks.FirstOrDefaultAsync(s => s.rollno == rollNumber);
            if (mark == null)
            {
                return NotFound();
            }

            mark.telugu = stuMarks.telugu;
            mark.hindi = stuMarks.hindi;
            mark.english = stuMarks.english;
            mark.maths = stuMarks.maths;
            mark.social = stuMarks.social;
            mark.science = stuMarks.science;

            await _context.SaveChangesAsync();
            return Ok(mark);
        }


    }
}
