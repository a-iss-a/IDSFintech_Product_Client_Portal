namespace backend.Models
{
    public class TeamMember
    {
        public int Id { get; set; }
        public int? DepartmentId { get; set; }
        public required string Name { get; set; }
        public string? JobTitle { get; set; }
        public required string Email { get; set; }
        public required string Status { get; set; }

        public Department? Department { get; set; }
        public ICollection<ProductResponsibility> ProductResponsibilities { get; set; } = new List<ProductResponsibility>();
    }
}
