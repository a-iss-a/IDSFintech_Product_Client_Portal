namespace backend.Models
{
    public class Document
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public required string Name { get; set; }

        public string? DocumentType { get; set; }

        public string? Description { get; set; }

        public string? UrlOrFileReference { get; set; }

        public DateTime? LastUpdatedDate { get; set; }

        public Product Product { get; set; } = null!;
    }
}
