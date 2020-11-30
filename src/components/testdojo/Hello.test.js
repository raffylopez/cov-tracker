/*
 * Hello.test.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Hello from './Hello'

let container = null;

beforeEach(()=> {
  console.log("[ beforeEach ]")
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterEach(()=> {
  console.log("[ afterEach ]")
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

it('Says hello to Maya', ()=>{
  act(
    ()=> {
      render(<Hello name='Maya' />, container)
    }
  );
  expect(container.textContent).toBe("Hello, Maya");
});

it('Says hello to Jughead', ()=>{
  act(
    ()=> {
      render(<Hello name='Jughead' />, container)
    }
  );
  expect(container.textContent).toBe("Hello, Jughead");
});
