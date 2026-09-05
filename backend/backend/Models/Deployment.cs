namespace backend.Models
{
    public class Deployment
    {
        public int Id { get; set; }

        public int ClientId { get; set; }

        public int ProductId { get; set; }

        public required string ProductVersion { get; set; }

        public DateTime? GoLiveDate { get; set; }

        public required string DeploymentStatus { get; set; }

        public required string SupportTier { get; set; }

        public string? ClientSpecificNotes { get; set; }

        public Client Client { get; set; } = null!;

        public Product Product { get; set; } = null!;
        public ICollection<DeploymentEnvironment> Environments { get; set; } = new List<DeploymentEnvironment>();
    }
}
