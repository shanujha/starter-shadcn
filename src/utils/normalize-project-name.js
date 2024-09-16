export default (name = 'project-name') => {
    return name.replace("-", " ").toUpperCase();
};