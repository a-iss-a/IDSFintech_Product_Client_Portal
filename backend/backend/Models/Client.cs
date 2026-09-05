namespace backend.Models
{
    public class Client
    {
        public int Id { get; set; }
        public required string CompanyName { get; set; }
        public required string Country { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public required string Status { get; set; }
        public string? Notes { get; set; }
        public ICollection<Deployment> Deployments { get; set; } = new List<Deployment>();
    }
}
