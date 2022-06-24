import * as mocks from "./__mocks__/form_mock";
import * as mock from "./__mocks__/index_mock";
import ejs from "ejs";
import path from "path";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "module";
import exp from "constants";

const targetFile = path.resolve(__dirname, "./edit.ejs");

const results = mocks.DB;

describe("Página de Edición de Usuario", () => {
  ejs.renderFile(targetFile, { user: undefined }, function (err, str) {
    if (err) {
      console.log(err);
    }
    if (str) {
      const renderer = render(str).baseElement;
      test("Id ingresada no válida", () => {
        expect(screen.findByText("Usuario no encontrado"));
      });
    }
  });
  ejs.renderFile(targetFile, { user: mock.DB[0] }, function (err, str) {
    if (err) {
      console.log(err);
    }
    if (str) {
      const renderer = render(str).baseElement;
      test("Revisar existencia de formulario", () => {
        expect(screen.findByPlaceholderText("Ingrese nombre")).toBeTruthy();
        expect(
          screen.findByPlaceholderText("Ingrese primer apellido")
        ).toBeTruthy();
        expect(
          screen.findByPlaceholderText("Ingrese segundo apellido")
        ).toBeTruthy();
        expect(screen.findByPlaceholderText("ejemplo@mail.com")).toBeTruthy();
        expect(screen.findByPlaceholderText("123456789")).toBeTruthy();
        expect(screen.findByRole("button", { name: "Guardar" })).toBeTruthy();
      });
      test("Revisar coherencia de formulario", () => {
        expect(
          screen.findByPlaceholderText("Ingrese nombre", {
            value: mock.DB[0].firstname,
          })
        ).toBeTruthy();
        expect(
          screen.findByPlaceholderText("Ingrese primer apellido", {
            value: mock.DB[0].lastname1,
          })
        ).toBeTruthy();
        expect(
          screen.findByPlaceholderText("Ingrese segundo apellido", {
            value: mock.DB[0].lastname2,
          })
        ).toBeTruthy();
        expect(
          screen.findByPlaceholderText("ejemplo@mail.com", {
            value: mock.DB[0].email,
          })
        ).toBeTruthy();
        expect(
          screen.findByPlaceholderText("123456789", {
            value: mock.DB[0].phone,
          })
        ).toBeTruthy();
        expect(screen.findByRole("button", { name: "Guardar" })).toBeTruthy();
      });
      xtest("Validación de campo Nombre", () => {
        userEvent.type(
          screen.findByPlaceholderText("Ingrese nombre"),
          mocks.invalid.name_invalid
        );
        expect(
          screen.findByText("Por favor ingrese un nombre válido")
        ).toBeTruthy();
        userEvent.clear(screen.findByPlaceholderText("Ingrese nombre"));
        userEvent.type(
          screen.findByPlaceholderText("Ingrese nombre"),
          mocks.invalid.username_long
        );
        expect(screen.findByPlaceholderText("Ingrese nombre").value).toBe(
          mocks.invalid.username_long.slice(0, mocks.invalid.username_long - 1)
        );
        expect(
          screen.findByText("Por favor ingrese un nombre válido")
        ).toBeTruthy();
        userEvent.clear(screen.findByPlaceholderText("Ingrese nombre"));
        userEvent.type(
          screen.findByPlaceholderText("Ingrese nombre"),
          mocks.valid.username
        );
      });
      xtest("Validación de campo Primer apellido", () => {
        userEvent.type(
          screen.findByPlaceholderText("Ingrese primer apellido"),
          mocks.invalid.name_invalid
        );
        expect(
          screen.findByText("Por favor ingrese un primer Apellido válido")
        ).toBeTruthy();
        userEvent.clear(
          screen.findByPlaceholderText("Ingrese primer apellido")
        );
        userEvent.type(
          screen.findByPlaceholderText("Ingrese primer apellido"),
          mocks.invalid.lastname_long
        );
        expect(
          screen.findByPlaceholderText("Ingrese primer apellido").value
        ).toBe(
          mocks.invalid.lastname_long.slice(0, mocks.invalid.lastname_long - 1)
        );
        expect(
          screen.findByText("Por favor ingrese un primer Apellido válido")
        ).toBeTruthy();
        userEvent.clear(
          screen.findByPlaceholderText("Ingrese primer apellido")
        );
        userEvent.type(
          screen.findByPlaceholderText("Ingrese primer apellido"),
          mocks.valid.lastname1
        );
      });
      xtest("Validación de campo Segundo apellido", () => {
        userEvent.type(
          screen.findByPlaceholderText("Ingrese segundo apellido"),
          mocks.invalid.name_invalid
        );
        expect(
          screen.findByText("Por favor ingrese un segundo Apellido válido")
        ).toBeTruthy();
        userEvent.clear(
          screen.findByPlaceholderText("Ingrese segundo apellido")
        );
        userEvent.type(
          screen.findByPlaceholderText("Ingrese segundo apellido"),
          mocks.invalid.lastname_long
        );
        expect(
          screen.findByPlaceholderText("Ingrese segundo apellido").value
        ).toBe(
          mocks.invalid.lastname_long.slice(0, mocks.invalid.lastname_long - 1)
        );
        expect(
          screen.findByText("Por favor ingrese un segundo Apellido válido")
        ).toBeTruthy();
        userEvent.clear(
          screen.findByPlaceholderText("Ingrese segundo apellido")
        );
        userEvent.type(
          screen.findByPlaceholderText("Ingrese segundo apellido"),
          mocks.valid.lastname2
        );
      });
      xtest("Validación de campo Email", () => {
        userEvent.type(
          screen.findByPlaceholderText("ejemplo@mail.com"),
          mocks.invalid.email_invalid1
        );
        expect(
          screen.findByText(
            "Por favor ingrese un mail válido de la forma ejemplo@mail.com"
          )
        ).toBeTruthy();
        userEvent.clear(screen.findByPlaceholderText("ejemplo@mail.com"));
        userEvent.type(
          screen.findByPlaceholderText("ejemplo@mail.com"),
          mocks.invalid.email_invalid2
        );
        expect(
          screen.findByText(
            "Por favor ingrese un mail válido de la forma ejemplo@mail.com"
          )
        ).toBeTruthy();
        userEvent.clear(screen.findByPlaceholderText("ejemplo@mail.com"));
        userEvent.type(
          screen.findByPlaceholderText("ejemplo@mail.com"),
          mocks.valid.email
        );
      });
      xtest("Validación de campo Telefono", () => {
        userEvent.type(
          screen.findByPlaceholderText("123456789"),
          mocks.invalid.phone_short
        );
        expect(
          screen.findByText(
            "Por favor ingresar un número de telefono válido de 9 dígitos"
          )
        ).toBeTruthy();
        userEvent.clear(screen.findByPlaceholderText("123456789"));
        userEvent.type(
          screen.findByPlaceholderText("123456789"),
          mocks.invalid.phone_long
        );
        expect(
          screen.findByText(
            "Por favor ingresar un número de telefono válido de 9 dígitos"
          )
        ).toBeTruthy();
        userEvent.clear(screen.findByPlaceholderText("123456789"));
        userEvent.type(
          screen.findByPlaceholderText("123456789"),
          mocks.invalid.phone_invalid
        );
        expect(
          screen.findByText(
            "Por favor ingresar un número de telefono válido de 9 dígitos"
          )
        ).toBeTruthy();
        userEvent.clear(screen.findByPlaceholderText("123456789"));
        userEvent.type(
          screen.findByPlaceholderText("123456789"),
          mocks.valid.phone
        );
      });
    }
  });
});
