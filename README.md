# OlayReact

[Olay] implemented as a [React] component.


## Install

```bash
bower install olay-react
```

or

```bash
npm install olay-react
```

## Browser Support

OlayReact supports all of the modern browsers out of the box. To support older
versions of IE (<= 9), you will need to include a shim to add [classList]
support.

## API

### Top-Level

#### OlayReact

OlayReact is a normal React component. To open or close the Olay, simply add or remove a child element to the Olay component.

### Properties

#### close `required`

Provide a `close` function to be invoked when an action has dictated that the
Olay should be closed. This function should ensure the OlayReact component will
have no children in it the next time `render` is called. See the test file for
an example of using React `state` to manage the state of the Olay's visibility.

#### transitionName

The name of the transition to use, defaults to `olay-fade` which is provided in
[olay-react.css](olay-react.css).

#### transitionEnter/transitionLeave

Boolean values that determine when transitions should be used, each default to
`true`.

#### children

Render children inside of the OlayReact component to open an Olay with those children. Render no children to hide the Olay.

## Examples

Check out [the test file](https://orgsync.github.io/olay-react/test.html) for a
full example.

## Known Issues

- Preventing tab-focusing from leaving the Olay is not implemented. The only
  solutions I've found (including the one orgsync/olay uses) are quite hacky.

[Olay]: https://github.com/orgsync/olay
[React]: https://github.com/facebook/react
[classList]: https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
