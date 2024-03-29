# DARA Frontend

This is the prototype frontend for the DataAccessRequestAssistant DARA.  
It is currently accessible via https://daskita.github.io/dara-frontend.

The Data Access Request Assistant (DARA) consists of 
* a process repository ([DARA-API](https://github.com/DaSKITA/dara-api)), 
* a browser-extension as automation engine ([DARA-Extension](https://github.com/DaSKITA/dara-extension)), and 
* this frontend (DARA-Frontend)

For more information on DARA, please refer to the general DaSKITA [readme](https://github.com/DaSKITA).

## Usage
It is ment to be used together with [DARA browser extension](https://github.com/DaSKITA/dara-extension), which is based on the automa extension.  
You can download the extension here:

<table cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td valign="center">
        <a align="center" href="https://chrome.google.com/webstore/detail/automa/heolgaalbnnelipfhbccbkdohecmaimo">
          <img height=60px src="src/assets/webstore.png" alt="Chrome web store" />
          <p align="center">Chrome Web Store</p>
        </a>
      </td>
      <td valign="center">
        <a href="https://addons.mozilla.org/en-US/firefox/addon/dara/">
          <img height=60px src="src/assets/ffaddons.png" alt="Firefox add-ons" />
          <p align="center">Firefox Add-ons</p>
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Development
This frontend was build using React.

### Requirments
- JavaScript 
- Node >= 14 
- React Scripts, install e.g. with ``npm i react-scripts``

### Getting started
Just run ``npm start``, afterwards, ``http://localhost:3000/dara-frontend`` will open automatically.
