// src/Gherkin/step_definitions/loginSteps.js
const { Given, When, Then } = require('@cucumber/cucumber');

Given('que soy un usuario registrado', function () {
  console.log('Simulando usuario registrado');
});

When('ingreso mis credenciales correctas', function () {
  console.log('Ingresando credenciales correctas');
});

When('ingreso una contraseña incorrecta', function () {
  console.log('Ingresando contraseña incorrecta');
});

Then('debo ser redirigido a la página de inicio de sesión', function () {
  console.log('Verificación de redirección');
});

Then('debo ver un mensaje de error de inicio de sesión', function () {
  console.log('Verificación de mensaje de error');
});
