using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IDocumentRepository repository;

        public DocumentService(IDocumentRepository repository)
        {
            this.repository = repository;
        }

        public Task AddDocument(Document document) => repository.AddDocument(document);

        public Task DeleteDocument(int id) => repository.DeleteDocument(id);

        public void DeleteFile(string relativePath) => repository.DeleteFile(relativePath);

        public Task<IEnumerable<Document>> GetAll() => repository.GetAll();

        public async Task<Document> GetDocument(int id) => await repository.GetDocument(id) ??
            throw new KeyNotFoundException("Document not found");

        public async Task<Document> GetDocumentByProduct(int productId) => await repository.GetDocumentByProduct(productId) ??
            throw new KeyNotFoundException("Document not found");

        public async Task<Document> GetDocumentByType(string type) => await repository.GetDocumentByType(type) ??
            throw new KeyNotFoundException("Document not found");

        public Task<string> SaveFileAsync(Microsoft.AspNetCore.Http.IFormFile file) => repository.SaveFileAsync(file);

        public Task UpdateDocument(Document document) => repository.UpdateDocument(document);
    }
}
