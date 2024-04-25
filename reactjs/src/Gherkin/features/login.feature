Feature: Inicio de sesión en el Sistema de Tutorías

  # Este escenario prueba el inicio de sesión exitoso
  Scenario: Inicio de sesión exitoso
    Given que soy un usuario registrado
    When ingreso mis credenciales correctas
    Then debo ser redirigido a la página de inicio de sesión

  # Este escenario prueba el inicio de sesión fallido debido a una contraseña incorrecta
  Scenario: Inicio de sesión fallido por contraseña incorrecta
    Given que soy un usuario registrado
    When ingreso una contraseña incorrecta
    Then debo ver un mensaje de error de inicio de sesión
