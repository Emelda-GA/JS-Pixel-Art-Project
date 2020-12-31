/*----- Title: Pixel Art Maker
        Author: Melinda Eades
        Date: 2020
        Availability: https://github.com/Emelda-GA/JS-Pixel-Art-Project*/
/*      Original code below was developed using information derived from the following sources:
        https://classroom.udacity.com/nanodegrees/Intro to Programming Nanodegree,
        https://maxwellito.github.io/triangulart/ (for svg starter grid), 
        https://github.com/MrDev-io/Triangularize.js/blob/master/src/js/triangularize.js,
        https://www.w3schools.com/js/js_arithmetic.asp,
        https://www.w3schools.com/jsref/jsref_pow.asp,
        https://www.w3schools.com/w3js/w3js_selectors.asp,
        https://www.w3schools.com/howto/howto_js_list_grid_view.asp,
        https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio,
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round,
        https://stackoverflow.com/questions/34428723/how-to-implement-svgs-preserveaspectratio-xminymin-slice-for-canvas-drawimage


/*      Code will allow the user to select triangle grid size from sizePicker:
        Svg utilized to provide a starter grid and then can be customized by the user.
        (*****Please note grid width input will display available parameters message which must be an odd number to produce triangle grid, grid height can be any selected).
        User can select color from colorPicker, and draw art with a click or drag of mouse.
        User will also be able to right click and erase cells on grid.*/


        'use strict';

        /* ----- Set Pixel Dimensions ----- */
        
        const
          pixelWidth = 30,
          pixelHeight = Math.round(Math.sqrt(Math.pow(pixelWidth, 2) - Math.pow(pixelWidth / 2, 2)));
        
        /* ----- Set Grid Dimensions ----- */
        
        let
          gridCols = 0,
          gridRows = 0;
        
        /* ----- Global Selectors  ----- */
        
        const
          gridForm = document.getElementById('sizePicker'),
          gridContainer = document.getElementById('gridContainer'),
          colorPicker = document.getElementById('colorPicker');
        
        /* ----- Render Pixel Grid ----- */
        
        function renderPixelGrid() {
          gridCols = Math.round(document.getElementById('inputWidth').value) || 0;
          gridRows = Math.round(document.getElementById('inputHeight').value) || 0;
        
          // Create Grid Fragment
          const grid = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        
          // Set Pixel Counter and Offsets
          let
            counter = 0,
            offsetWidth = 0,
            offsetHeight = 0;
        
          // Loop Grid Rows
          for (let i = 0; i < gridRows; i++) {
            // Set Offset for Rows
            offsetHeight = pixelHeight * i;
        
            // Loop Grid Columns
            for (let j = 0; j < gridCols; j++) {
              // Create Pixel Fragment
              const pixel = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
              // Set Offset for Columns
              offsetWidth = (pixelWidth / 2) * j;
        
              // Switch between Odd and Even Pixels
              if (counter % 2 === 0) {
                pixel.setAttribute('d', `M${( pixelWidth / 2 ) + offsetWidth} ${offsetHeight} L${offsetWidth} ${pixelHeight + offsetHeight} L${pixelWidth + offsetWidth} ${pixelHeight + offsetHeight} Z`);
              } else {
                pixel.setAttribute('d', `M${offsetWidth} ${offsetHeight} L${( pixelWidth / 2 ) + offsetWidth} ${pixelHeight + offsetHeight} L${pixelWidth + offsetWidth} ${offsetHeight} Z`);
              }
        
              // Append Pixel into Grid
              pixel.setAttribute('fill', 'none');
              pixel.setAttribute('rel', counter);
              grid.appendChild(pixel);
        
              // Increase counter
              counter++;
            }
          }
        
          // Set Grid Attributes
          grid.setAttribute('id', 'pixelCanvas');
          grid.setAttribute('version', '1.1');
          grid.setAttribute('preserveAspectRatio', 'xMinYMin slice');
          grid.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          grid.setAttribute('width', (gridCols + 1) * (pixelWidth / 2));
          grid.setAttribute('height', gridRows * pixelHeight);
          grid.setAttribute('viewBox', `0 0 ${( gridCols + 1 ) * ( pixelWidth / 2 )} ${gridRows * pixelHeight}`);
          grid.setAttribute('class', 'pixelGrid');
        
          // Append Grid into Container
          gridContainer.innerHTML = null;
          gridContainer.appendChild(grid);
        }
        
        /* ----- Event Listeners ----- */
        
        let
          currentTarget = null,
          currentColor = '#000000';
        
        // Event: Submit Grid Form
        gridForm.addEventListener('submit', (e) => {
          e.preventDefault();
          renderPixelGrid();
        });
        
        // Event: Color Picker Change
        colorPicker.addEventListener('input', () => {
          currentColor = colorPicker.value || currentColor;
        });
        
        // Event: Context Menu
        gridContainer.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        });
        
        // Event: Pointer Down
        gridContainer.addEventListener('pointerdown', (e) => {
          const el = e.target;
        
          if (el.nodeName === 'path') {
            currentTarget = el;
            el.setAttribute('fill', e.buttons === 1 ? currentColor : 'none');
          }
        });
        
        // Event: Pointer Move
        gridContainer.addEventListener('pointermove', (e) => {
          const el = e.target;
        
          if (e.buttons && currentTarget !== el && el.nodeName === 'path') {
            currentTarget = el || currentTarget;
            el.setAttribute('fill', e.buttons === 1 ? currentColor : 'none');
          }
        });
        
        // Window loaded
        window.addEventListener('load', () => {
          renderPixelGrid();
        });