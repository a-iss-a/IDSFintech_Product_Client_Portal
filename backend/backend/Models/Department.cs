namespace backend.Models
{
    public class Department
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public ICollection<TeamMember> TeamMembers { get; set; } = new List<TeamMember>();
    }
}
