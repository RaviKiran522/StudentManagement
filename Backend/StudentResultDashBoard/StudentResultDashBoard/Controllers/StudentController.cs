using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentResultDashBoard.Modals;

namespace StudentResultDashBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly SchoolContext _context;

        public StudentsController(SchoolContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostStudent([FromBody] Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(PostStudent), new { rollNo = student.rollNo }, student);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(students);
        }

        [HttpGet("rollnumber/{rollNumber}")]
        public async Task<ActionResult<Student>> GetStudentByRollNumber(string rollNumber)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.rollNo == rollNumber);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpPut("rollnumber/{rollNumber}")]
        public async Task<IActionResult> UpdateStudentByRollNumber(string rollNumber, [FromBody] Student updatedStudent)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.rollNo == rollNumber);
            if (student == null)
            {
                return NotFound();
            }

            student.nam = updatedStudent.nam;
            student.clas = updatedStudent.clas;
            student.adds = updatedStudent.adds;
            student.fatherName = updatedStudent.fatherName;
            student.classTeacher = updatedStudent.classTeacher;
            student.mobileNumber = updatedStudent.mobileNumber;

            await _context.SaveChangesAsync();
            return Ok(student);
        }

        [HttpDelete("rollnumber/{rollNumber}")]
        public async Task<IActionResult> DeleteStudentByRollNumber(string rollNumber)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.rollNo == rollNumber);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

