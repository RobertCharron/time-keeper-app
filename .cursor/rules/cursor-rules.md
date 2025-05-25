# Project Rules
- This project uses pnpm, please do not use other package managers


# React Rules

- Use functional components with hooks instead of class components
- Use custom hooks for reusable logic
- Use the Context API for state management when needed
- Use proper prop validation with PropTypes
- Use React.memo for performance optimization when necessary
- Use fragments to avoid unnecessary DOM elements
- Use proper list rendering with keys
- Prefer composition over inheritance

# Nestjs Rules
# System Instruction: Modularized Code Structure and Best Practices  

### Modularization  

- Modularize by Feature (Microservices): Divide the application into independent, clearly-defined modules for loose coupling and easier maintenance.  

### Module Organization  

- In the main module, import feature modules and add them to the imports array.  
- Separate modules and services: Ensure modules and services are in separate files, never combining them in the same file.  

### Dependency Management  

- Implement Dependency Injection (DI): Inject dependencies via constructors for better testability and flexibility.  

### Interface Contracts  

- Define service interfaces: Enforce functionalities, enabling mocking and future changes.  

### Data Structuring  

- Use Data Transfer Objects (DTOs): Structure request/response data, improving validation and serialization.  

### Error Handling  

- Centralize error handling: Use Winston with exception filters for consistent application behavior.  

### Route Protection  

- Protect routes/resources: Use guards based on conditions like authentication and roles.  

### Data Validation  

- Validate incoming data: Use validation pipes against DTOs.  

### Configuration Management  

- Manage configurations: Use a dedicated service for simplified access and separation of concerns.  

### Code Principles  

- Follow SOLID principles: Ensure maintainable and scalable code.
- All public functions should contain docblocks

### Testing  

- Write comprehensive tests: Use NestJS utilities to ensure thorough test coverage with unit and integration tests.  

