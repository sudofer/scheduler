import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
      
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const {container, debug} = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    })
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, 'appointment')[0];
    
    fireEvent.click(getByAltText(appointment, 'Add'));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    })
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, 'Save'));
    // 7. Check that the element with the text "Saving" is displayed.
    await waitForElement(() => getByText(appointment, "Saving"));
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    await waitForElement(() => getByText(appointment, "Confirm?"));
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Confirm'));
    // 6. Check that the element with the text "Deleting" is displayed.
    await waitForElement(() => getByText(appointment, "Deleting"));
    // 7. Wait until the element with the "Add" button is displayed.
        
    await waitForElement(() => getByAltText(appointment, "Add"));
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    //     We want to start by finding an existing interview.
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // With the existing interview we want to find the edit button.
    fireEvent.click(getByAltText(appointment, 'Edit'));
    // We change the name and save the interview.
    await waitForElement(() => getByText(appointment, "Save"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Andy Murray' }
    })
    fireEvent.click(getByText(appointment, 'Save'));
    // We don't want the spots to change for "Monday", since this is an edit.
    const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, 'appointment')[0]
    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    })
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, 'Save'));
    await waitForElement(() => getByText(appointment, "Error"));
    fireEvent.click(getByAltText(appointment, 'Close'));

  });
})

