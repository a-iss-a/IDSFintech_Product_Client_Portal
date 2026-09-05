namespace backend.Models
{
    public class DocumentUploadRequest
    {
        public int ProductId { get; set; }

        public required string Name { get; set; }

        public string? DocumentType { get; set; }

        public string? Description { get; set; }

        public DateTime? LastUpdatedDate { get; set; }

        public Microsoft.AspNetCore.Http.IFormFile? File { get; set; }
    }
}