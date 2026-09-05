namespace backend.Models
{
    public class Module
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public required string Name { get; set; }

        public string? Description { get; set; }

        public required string Status { get; set; }

        public Product Product { get; set; } = null!;
    }
}
