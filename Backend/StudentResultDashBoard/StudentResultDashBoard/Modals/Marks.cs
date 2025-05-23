using System.ComponentModel.DataAnnotations;

namespace StudentResultDashBoard.Modals
{
    public class Mark
    {
        [Key]
        public string rollno { get; set; }
        public string clas { get; set; }

        [Required]
        public string telugu { get; set; }

        public string hindi { get; set; }

        public string english { get; set; }

        public string maths { get; set; }

        public string social { get; set; }

        public string science { get; set; }


    }
}
