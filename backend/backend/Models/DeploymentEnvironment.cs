namespace backend.Models
{
    public class DeploymentEnvironment
    {
        public int Id { get; set; }

        public int DeploymentId { get; set; }

        public required string Name { get; set; }

        public required string Type { get; set; }

        public string? Purpose { get; set; }

        public string? ServerName { get; set; }

        public string? OperatingSystem { get; set; }

        public string? ApplicationUrl { get; set; }

        public string? DatabaseInformation { get; set; }

        public string? MonitoringLink { get; set; }

        public string? AccessInstructions { get; set; }

        public string? Notes { get; set; }

        public Deployment Deployment { get; set; } = null!;
    }
}
