
namespace backend.Models
{
    public class Product
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public string? Description { get; set; }

        public string? BusinessPurpose { get; set; }

        public required string LifecycleStatus { get; set; }

        public required string CurrentVersion { get; set; }

        public string? SupportedMarkets { get; set; }

        public string? Criticality { get; set; }

        public string? Technologies { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
        public ICollection<Module> Modules { get; set; } = new List<Module>();
        public ICollection<Deployment> Deployments { get; set; } = new List<Deployment>();
        public ICollection<ProductResponsibility> ProductResponsibilities { get; set; } = new List<ProductResponsibility>();
        public ICollection<CodeRepo> Repositories { get; set; } = new List<CodeRepo>();
        public ICollection<Document> Documents { get; set; } = new List<Document>();
    }
}
