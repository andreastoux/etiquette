import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Filter = styled.div`
  display: flex;
  padding: 1em 0;
  font-size: 1rem;

  .dropdown {
    display: flex;
    flex-direction: column;
    font-family: "Work Sans", sans-serif;
    position: relative;

    h4 {
      font-weight: 500;
      font-size: 0.75rem;
      margin-bottom: 3px;
    }
    //control (all products dropdown 'button')
    .control {
      border: 1px solid black;
      padding: 2.5px 10px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      outline: 2px solid transparent;
      outline-color: transparent;
      transition: all 0.2s ease;
      border-bottom: 4px solid;

      &:hover {
        outline-color: #cccccc;
      }

      .selected-value {
        font-size: 0.75rem;
      }

      .arrow {
        align-items: flex-start;
        margin-bottom: 3px;
        &:after {
          font-size: 0.75rem;
          margin-left: 5px;
          content: "▼";
        }
      }
      .open {
        &:after {
          font-size: 0.75rem;
          margin-left: 5px;
          content: "▲";
        }
      }
    }

    //options (when dropdown is open, what can u click?)
    .options {
      padding: 10px 0;
      font-size: 0.9rem;
      height: fit-content;
      width: fit-content;
      position: absolute;
      top: 55px;
      border-radius: 5px;
      flex-direction: column;
      background: white;
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
      z-index: 10;
      border-bottom: 4px solid;
      opacity: 0;
      display: none;
      transform: translateY(-15px) scale(0.9);
      transition: all 0.2s ease;

      .option {
        padding: 3px 10px;
        cursor: pointer;
        width: 100%;

        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
    .open {
      display: block;
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }
`;

export default function FilterSort({ prompt, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [open]);

  return (
    <Filter>
      <div className="dropdown">
        <h4>FILTER BY</h4>
        <div className="control" onClick={() => setOpen(!open)} ref={ref}>
          <div className="selected-value">
            {value
              ? value.title.slice(0, 1).toUpperCase() +
                value.title.slice(1, value.length) +
                "s"
              : prompt}
          </div>
          <div className={`arrow ${open ? "open" : null}`} />
        </div>
        <div className={`options ${open ? "open" : null}`}>
          {options.length !== 0 &&
            options.map((option) => (
              <div
                className="option"
                key={uuidv4()}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option.title.slice(0, 1).toUpperCase() +
                  option.title.slice(1, option.length) +
                  "s"}
              </div>
            ))}
        </div>
      </div>
    </Filter>
  );
}
