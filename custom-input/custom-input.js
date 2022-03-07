/**
 * Example of a custom 'input' component.
 * This file would need to be available from a public url.
 * The component could then be registered using the components property of the options JSON supplied to the flow.js script.
 * A custom component file must be an ES module which exposes the component as its default export.
 */

// The window.boomi object;
const flow = window.boomi.flow;

const React = flow.React;
const hooks = flow.hooks;

// Create an alias so we don't have to write out React.createElement every time
const $ = React.createElement;

// Converts any string into a hex colour code
const stringToColour = function (str) {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ('00' + value.toString(16)).slice(-2);
    }
    return colour;
};

// Our custom input component.
// Changes the background colour of the input as the user types into it.
const CustomInput = ({ id }) => {
    // Get the component object from the application state
    // along with a function to update a component
    // by calling the useComponent hook with the component ID.
    const { component, updateComponent } = hooks.useComponent({ componentId: id });

    const onInput = ({ target: { value } }) =>
        updateComponent(
            // Pass the component ID
            component.id,
            // Pass a partial component object with any updates
            {
                contentValue: value,
            },
            // Do not notify subscribers (collaborators, page conditions) on every character change
            { notifySubscribers: false },
        );

    const onBlur = ({ target: { value } }) =>
        updateComponent(component.id, {
            contentValue: value,
        });

    // Generate a colour based on the contentValue of the component if its not empty
    const backgroundColor =
        component.contentValue === '' ? '' : stringToColour(component.contentValue ?? '');

    // Return a React input element
    return $('input', {
        style: { backgroundColor },
        type: 'text',
        className: 'input custom-input',
        id: component.id,
        value: component.contentValue ?? '',
        onInput,
        onBlur,
        readOnly: !component.isEditable,
        disabled: !component.isEnabled,
        required: component.isRequired,
    });
};

export default CustomInput;
