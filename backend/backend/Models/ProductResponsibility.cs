namespace backend.Models
{
    public class ProductResponsibility
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int TeamMemberId { get; set; }

        public required string Responsibility { get; set; }

        public string? Description { get; set; }

        public Product Product { get; set; } = null!;
        public TeamMember TeamMember { get; set; } = null!;
    }
}
