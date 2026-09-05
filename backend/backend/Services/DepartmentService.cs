using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository repository;

        public DepartmentService(IDepartmentRepository repository)
        {
            this.repository = repository;
        }

        public Task AddDepartment(Department department) => repository.AddDepartment(department);

        public Task DeleteDepartment(int id) => repository.DeleteDepartment(id);

        public Task<IEnumerable<Department>> GetAll() => repository.GetAll();

        public async Task<Department> GetDepartment(int id) => await repository.GetDepartment(id) ??
            throw new KeyNotFoundException("Department not found");

        public Task UpdateDepartment(Department department) => repository.UpdateDepartment(department);
    }
}
