namespace backend.Models
{
    public class CodeRepo
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public required string Name { get; set; }

        public required string GitHubURL { get; set; }

        public required string MainBranch { get; set; }

        public string? Description { get; set; }

        public Product Product { get; set; } = null!;
    }
}
