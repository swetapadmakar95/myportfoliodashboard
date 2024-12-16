import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RecentActivities from './components/RecentActivities';
// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

test('renders Portfolio Dashboard', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  const dashboardElement = screen.getByTestId('dashboardTitle');
  expect(dashboardElement).toBeInTheDocument();
});

test('testing text box', () => {
  render(
   <RecentActivities/>
  );
  const inputelement = screen.getAllByRole('textbox')[0];
  fireEvent.change(inputelement,{target:{value:'test'}})
  expect(inputelement.value).toBe('test');

  // const inputelement = screen.getByRole('textbox');
  // fireEvent.change(inputelement,{target:{value:'test'}})
  // expect(inputelement.value).toBe('test');
});

test("click event test case",()=>{
  render(
    <RecentActivities/>
   );
   let activitytitleinput = screen.getByPlaceholderText('Enter Activity Title');
   let activitydescritionsinput = screen.getByPlaceholderText('Enter Activity Description');
   let buttonelment = screen.getByRole('button');

   fireEvent.change(activitytitleinput,{target: {value:"test activity"}});
   fireEvent.change(activitydescritionsinput,{target:{value:"test activity description"}})
   fireEvent.click(buttonelment)
   expect(screen.getByText('test activity')).toBeInTheDocument();
   expect(screen.getByText('test activity description')).toBeInTheDocument()
})

// test("snapshort test",()=>{
//   const temp = render(
//     <RecentActivities/>
//    );
//    expect(temp).toMatchSnapshot();
// })