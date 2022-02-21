import React from "react";
import { GridView } from "./GridView";
import { PanelVistaArbol } from "./PanelVistaArbol";
import { ToolBarGridView } from "./ToolBarGridView";

export const GestionDirectorioScreen = () => {
  return (
    <>
      <div className="">
        <div>
          <nav className="sidebar d-flex justify-content-start">
            <PanelVistaArbol />
          </nav>
        </div>

        <section className="p-4 my-container">
          <div>
            <ToolBarGridView />
          </div>
          <div>
            <GridView />
          </div>
        </section>
      </div>
    </>
  );
};
