using backend.Models;

namespace backend.Repositories
{
    public interface IDocumentRepository
    {
        Task<IEnumerable<Document>> GetAll();
        Task<Document> GetDocument(int id);
        Task DeleteDocument(int id);
        Task AddDocument(Document document);
        Task UpdateDocument(Document document);
        Task<Document> GetDocumentByProduct(int  productId);
        Task<Document> GetDocumentByType(string type);
        Task<string> SaveFileAsync(Microsoft.AspNetCore.Http.IFormFile file);
        void DeleteFile(string relativePath);
    }
}
