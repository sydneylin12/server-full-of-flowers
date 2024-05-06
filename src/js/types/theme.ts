// Theme for AWS authenticator
const customTheme = {
    // Override default styles here
    container: {
        // Custom container styles
        maxWidth: '400px', // Adjust as needed
        margin: '0 auto',
    },
    formSection: {
        // Custom form section styles
        marginBottom: '20px',
    },
    input: {
        // Custom input styles
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '100%',
    },
    button: {
        // Custom button styles
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    buttonHover: {
        // Custom button hover styles
        backgroundColor: '#0056b3',
    },
    link: {
        // Custom link styles
        color: '#007bff',
        textDecoration: 'none',
    },
    linkHover: {
        // Custom link hover styles
        textDecoration: 'underline',
    },
    errorMessage: {
        // Custom error message styles
        color: '#dc3545',
        marginTop: '10px',
    },
    sectionHeader: {
        // Custom section header styles
        fontSize: '24px',
        marginBottom: '20px',
    },
    signUp: {
        // Custom sign-up styles
        textAlign: 'center',
    },
    signUpLink: {
        // Custom sign-up link styles
        fontWeight: 'bold',
    },
};

export default customTheme;