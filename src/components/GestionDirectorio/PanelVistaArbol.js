import React, { useEffect, useRef, useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useDispatch, useSelector } from "react-redux";
import { Treebeard } from "react-treebeard";
import {
  Modal,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";
import { eventAddNew, setActive } from "../../actions/events";
import { useForm } from "../../hooks/useForm";

const directory = {
  name: "root",
  toggled: true,
  children: [
    {
      name: "parent",
      children: [{ name: "child1" }, { name: "child2" }],
    },
    {
      name: "loading parent",
      children: [{ name: "childLoadingf1" }, { name: "childLoadingf2" }],
    },
    {
      name: "parent2",
      children: [
        {
          name: "nested parent",
          children: [{ name: "nested child 1" }, { name: "nested child 2" }],
        },
      ],
    },
  ],
};

export const PanelVistaArbol = () => {
  const dispatch = useDispatch();
  const { activeFile, files } = useSelector((state) => state.events);

  const [data, setData] = useState(directory);
  const [cursor, setCursor] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const initiEvent = {
    name: "",
  };

  const [formValues, setformValues] = useState(initiEvent);

  const { name } = formValues;

  useEffect(() => {
    setformValues(initiEvent);
  }, [setformValues]);

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onToggle = (node, toggled) => {
    setCursor(node);

    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setData(Object.assign({}, data));
    setCursor(node);
  };

  var copiaObjeto;
  const obj = {};

  function handleClick(e, d) {
    const nameItem = d.target.innerHTML;
    const nojoHijos = d.foo.children;
    copiaObjeto = {
      name: nameItem,
      children: nojoHijos,
    };

    //console.log(estado)

    findObject(data, "name", "loading parent", copiaObjeto);
    // console.log(data);
    // valorCopiar=nameItem;
    //.__reactEventHandlers$f6wpoyzd59
  }

  const handleCrear = (e, datos) => {
    setAbierto(!abierto);
    dispatch(setActive(datos.target.innerHTML));
  };

  const crearCarpeta = (datos) => {
    dispatch(eventAddNew(formValues, activeFile));
    setAbierto(false);
    setformValues(initiEvent);
  };

  //console.log(estado)

  function clickPegar(e, datos) {
    const nameItem = datos.target.innerHTML;
    console.log(copiaObjeto);
    findObject(data, "name", nameItem, copiaObjeto);
  }

  const findObject = (obj = {}, key, value, copiaObjeto = {}) => {
    const recursiveSearch = (obj = {}) => {
      if (!obj || typeof obj !== "object") {
        return;
      }
      if (obj[key] === value) {
        if (obj["children"]) {
          obj["children"].push(copiaObjeto);
        } else {
          obj["children"] = [];
          obj["children"].push(copiaObjeto);
        }
      }
      Object.keys(obj).forEach(function (k) {
        recursiveSearch(obj[k]);
      });
    };
    recursiveSearch(obj);
    console.log(data);
  };

  const crear = (obj = {}, key, value, carpeta) => {
    //console.log(carpeta)
    const recursiveSearch = (obj = {}) => {
      if (!obj || typeof obj !== "object") {
        return;
      }
      if (obj[key] === value) {
        obj["children"].push({ name: carpeta });
      }
      Object.keys(obj).forEach(function (k) {
        recursiveSearch(obj[k]);
      });
    };
    recursiveSearch(obj);
    console.log(data);
  };

  const copy = (e) => {
    console.log(cursor);
  };

  const menuConfig = {
    Copiar: (e) => copy(e),
    "Crear carpeta": () => console.log("Crear carpeta"),
    "Añadir a favoritos": () => console.log("Crear carpeta"),
    Propiedades: () => console.log("Crear carpeta"),
  };
  const decorators = {
    Toggle: (props) => {
      return (
        <div style={props.style}>
          <svg height={props.height} width={props.width}>
            // Vector Toggle Here
          </svg>
        </div>
      );
    },
  };

  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}

      <ContextMenuTrigger id="same_unique_identifier">
        <Treebeard className="toggle" data={files} onToggle={onToggle} />
      </ContextMenuTrigger>

      <ContextMenu id="same_unique_identifier">
        <MenuItem
          data={{ foo: cursor }}
          onClick={handleClick}
          onToggle={onToggle}
        >
          Copiar
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={handleCrear}>
          Crear carpeta
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
          Añair a favoritos
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
          Propiedades
        </MenuItem>

        <MenuItem className="pegar" data={{ foo: "bar" }} onClick={clickPegar}>
          Pegar
        </MenuItem>
      </ContextMenu>

      <Modal isOpen={abierto}>
        <ModalHeader>Crea una carpeta</ModalHeader>
        <FormGroup>
          <Label>Nombre de carpeta</Label>
          <Input
            name="name"
            value={name}
            onChange={handleInputChange}
            className="nombreCarpeta"
            type="text"
            placeholder="Escriba nombre de la carpeta"
          />
        </FormGroup>

        <ModalFooter>
          <Button onClick={crearCarpeta}>Crear Carpeta</Button>
          <Button onClick={() => setAbierto(false)}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

{
  /*
        <div className="App">
      <div className="box" onContextMenu={useCM(menuConfig)}>
        <code>
          <Treebeard data={data} onToggle={onToggle} />
        </code>
      </div>
      {contextMenu}
    </div>

<Treebeard data={data} onToggle={onToggle} />;

  */
}
