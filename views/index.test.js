import * as mocks from "./__mocks__/index_mock";
import ejs from "ejs";
import path from "path";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";

const targetFile = path.resolve(__dirname, "./index.ejs");

const results = mocks.DB;

describe("Página Principal", () => {
  ejs.renderFile(targetFile, { results: mocks.DB }, function (err, str) {
    if (err) {
      console.log(err);
    }
    if (str) {
      render(str).baseElement;
      test("Revisar existencia de tabla con datos dentro", () => {
        expect(
          screen.findByRole("button", { name: "Añadir usuario" })
        ).toBeTruthy();
        mocks.DB.forEach((element) => {
          expect(screen.findByText(element.id)).toBeTruthy();
          expect(screen.findByText(element.firstname)).toBeTruthy();
          expect(screen.findByText(element.lastname1)).toBeTruthy();
          expect(screen.findByText(element.lastname2)).toBeTruthy();
          expect(screen.findByText(element.phone)).toBeTruthy();
        });
      });
    }
  });

  ejs.renderFile(targetFile, { results: mocks.voidDB }, function (err, str) {
    if (err) {
      console.log(err);
    }
    if (str) {
      render(str).baseElement;

      test("Revisar mensaje de no existencia de usuario", () => {
        expect(
          screen.findByRole("button", { name: "Añadir usuario" })
        ).toBeTruthy();
        expect(screen.findByText("No hay usuarios disponibles")).toBeTruthy();
      });
    }
  });
});
