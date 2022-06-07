/**
 * Example of custom InputText component.
 * This file would need to be available from a public url.
 * The component could then be registered using the components property of the options JSON supplied to the flow.js script.
 *
 * The component renders a text input which generates a hex colour code from the characters of its text value.
 * This colour code is then applied to the background colour of the text input making it change colour as the user types.
 */

const { React } = window.boomi.flow;

/** Generates a numeric value from a string */
function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

/** Converts a numeric value into hexadecimal RGB colour value */
function intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const InputText = ({ element, updateElement, fireEvents }) => {
    const onInput = ({ target: { value } }) =>
        updateElement(element.id, {
            contentValue: value,
        });

    const onBlur = () => {
        fireEvents(element.id);
    };

    const colourCode = intToRGB(hashCode(element.contentValue ?? ''));

    return React.createElement('input', {
        style: { backgroundColor: `#${colourCode}` },
        className: 'input',
        id: element.id,
        value: element.contentValue ?? '',
        onInput,
        onBlur,
    });
};

export default InputText;
