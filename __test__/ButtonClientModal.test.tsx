import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonClient from '@/components/global/ButtonClient';
import useProjectModal from '@/hooks/useProjectModal';

// Mock the hook to control the modal behavior
jest.mock('@/hooks/useProjectModal');

describe('ButtonClient', () => {
  it('opens modal when button is clicked', () => {
    // Mock the onOpen function of the hook
    const mockUseProjectModal = useProjectModal as jest.MockedFunction<typeof useProjectModal>;
    const onOpenMock = jest.fn();
    mockUseProjectModal.mockReturnValue({ onOpen: onOpenMock });

    // Render the ButtonClient component with a title
    render(<ButtonClient title="Create Project" />);

    // Find the button by its title text
    const button = screen.getByText('Create Project');

    // Simulate a click event on the button
    fireEvent.click(button);

    // Check that the onOpen function was called when the button was clicked
    expect(onOpenMock).toHaveBeenCalledTimes(1);
  });
});
