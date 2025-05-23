using System.ComponentModel.DataAnnotations;

namespace StudentResultDashBoard.Modals
{
    public class Student
    {

        [Key]
        public string id { get; set; }

        [Required]
        public string nam { get; set; }

        public string rollNo { get; set; }

        public string clas { get; set; }

        public string classTeacher { get; set; }

        public string fatherName { get; set; }

        public string adds { get; set; }

        public string mobileNumber { get; set; }
    }
}
