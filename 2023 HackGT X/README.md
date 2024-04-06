# React + Vite

This repository offers a minimal setup for integrating React with Vite, complete with Hot Module Replacement (HMR) and essential ESLint configurations.

## Features

This template currently supports two official plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Utilizes [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Employs [SWC](https://swc.rs/) for Fast Refresh.

## Usage

### Running the Server

To start the Vite development server, execute the following command:

```bash
npm run dev
```

### Running Flask

Navigate to the backend folder and follow these steps:

1. Set the Flask application entry point:

    ```bash
    export FLASK_APP=app.py
    ```

2. Run the Flask application:

    ```bash
    flask run
    ```

## Instructions

Ensure you have Node.js and npm installed on your system. Additionally, if using Flask, set up the Python environment accordingly. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

## Acknowledgments

- Special thanks to the contributors of the Vite ecosystem for their valuable plugins and tools.
- Inspired by the React and Vite communities for their continuous support and innovation.

Feel free to contribute by opening issues or pull requests. Happy coding!
