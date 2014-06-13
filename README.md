# OlayReact

[Olay] implemented as a [React] component.


## Install

```bash
bower install olay-react
```

## API

### Top-Level

#### OlayReact

OlayReact is a normal React component. To open or close the Olay, simply add or remove a child element to the Olay component.

### Properties

#### onClose `required`

Provide an `onClose` function to be called when the Olay would like to be closed. This function should ensure the OlayReact component will have no children in it the next time `render` is called.

#### transitionName

The name of the transition to use, defaults to `olay-fade` which is provided in
[olay.css](olay.css).

#### transitionEnter/transitionLeave

Boolean values that determine when transitions should be used. They each default to `true` when `transitionName` exists.

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
