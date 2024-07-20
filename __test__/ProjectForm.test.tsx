import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '@/components/global/modal';
import useProjectModal from '@/hooks/useProjectModal';

// Mock the hook to control the isOpen state in the test
jest.mock('@/hooks/useProjectModal');

test('it opens modal', () => {
    const mockUseProjectModal = useProjectModal as jest.MockedFunction<typeof useProjectModal>;
    mockUseProjectModal.mockReturnValue({ isOpen: true });

    // Render the modal component with the necessary props
    render(<Modal title="Test Modal" body={<div>Test Content</div>} projects={[]} />);

    // The modal should be visible now, so the content should be in the document
    expect(screen.queryByText('Test Content')).toBeInTheDocument();
});
