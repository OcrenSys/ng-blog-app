# 📚 Angular Blog Application

### 🔗 Demo: [Blog App Demo](https://ng-blog-app.vercel.app/)
### 🎨 Figma Prototype: [Blog App Prototype](https://www.figma.com/design/7TDv8jsZ36rUFFj2cwa4yT/Technical-Test---Javascript?node-id=0-1&t=FfBUmJPitcHUGGES-0)

---

## 📝 Description
This Angular Blog Application is designed as a scalable, maintainable, and high-performance web app that showcases clean code practices and modern frontend development principles. The application is built with Angular, adhering to best practices such as SOLID principles and the repository pattern. Additionally, it features a responsive UI/UX design using TailwindCSS, ensuring a consistent and visually appealing experience across devices.

## 🚀 Key Features with Additions

- **Dynamic Blog Listing**: Fetches and displays blog posts using a well-structured service layer. The application dynamically lists all available blog posts in a user-friendly interface.

- **Search Functionality**: Users can filter posts by keywords, with real-time search results that instantly reflect the user's input, making it easy to find specific content.

- **Favorite Posts**: Allows users to mark/unmark their favorite posts, with the state persisted locally or in the backend, ensuring that favorites are maintained across sessions.

- **Load More Posts**: Implements pagination to handle large datasets effectively. Users can load more posts with a click, improving data management and user experience.

- **Create, Update, and Delete Posts**: Authorized users who are logged in can create new blog posts, update existing ones, or delete posts. This feature ensures that content management is seamless and secure.


## 🌟 Highlights

### TailwindCSS
- **Responsive Design**: The entire UI is fully responsive, ensuring compatibility across various screen sizes, from desktops to mobile devices.
- **Utility-First CSS**: TailwindCSS allows for rapid styling with utility classes, reducing the need for custom CSS while maintaining a consistent design language.
- **Custom Components**: Custom-designed components that follow the Figma prototype closely, ensuring design fidelity.

### Repository Pattern
- **Data Abstraction**: The repository pattern is implemented to abstract data access logic. This allows for easy swapping of data sources (e.g., REST API, local storage) without affecting the business logic.
- **Separation of Concerns**: Ensures that business logic is not tied to the data access layer, making the codebase more maintainable and testable.

### SOLID Principles
- **Single Responsibility Principle (SRP)**: Each class and function is designed to do one thing well, making the code easier to understand, maintain, and extend.
- **Open/Closed Principle (OCP)**: The application is designed to be open for extension but closed for modification, ensuring that new features can be added without altering existing code.
- **Liskov Substitution Principle (LSP)**: The application is structured so that objects of a superclass can be replaced with objects of a subclass without affecting the functionality.
- **Interface Segregation Principle (ISP)**: Ensures that clients do not have to implement interfaces they don't use, making the code cleaner and more modular.
- **Dependency Inversion Principle (DIP)**: High-level modules do not depend on low-level modules; both depend on abstractions. This improves code stability and flexibility.

### Clean Code
- **Readable Codebase**: The code follows best practices in naming conventions, comments, and formatting, making it easier for developers to collaborate and maintain the codebase.
- **Consistent Formatting**: The code is consistently formatted using ESLint and Prettier, ensuring a uniform code style across the project.
- **Avoiding Code Smells**: The application is designed to minimize technical debt by avoiding anti-patterns and code smells.

### UI/UX Design
- **User-Centric Design**: The application is built with a focus on providing a seamless and intuitive user experience. It closely follows the Figma prototype, ensuring a consistent look and feel.
- **Accessibility**: The UI components are designed with accessibility in mind, ensuring that the application is usable by a wide range of users, including those with disabilities.

### Reusable Code
- **Reusable Components**: The application is built with a component-based architecture, making it easy to reuse components across different parts of the app.
- **Modular Structure**: The codebase is structured in a modular way, promoting reusability and making it easier to extend the application in the future.


### Get started

✨ **Get Started Now!** Whether you're an avid reader or a content creator, our platform offers everything you need. **Download the app today** and start exploring, sharing, and managing your favorite content with ease!