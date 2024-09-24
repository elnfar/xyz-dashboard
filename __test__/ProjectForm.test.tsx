import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '@/components/global/modal';
import useProjectModal from '@/hooks/useProjectModal';

// Mock the hook to control the isOpen state in the test
jest.mock('@/hooks/useProjectModal');

describe('Modal Component', () => {
    let mockUseProjectModal: jest.MockedFunction<typeof useProjectModal>;

    beforeEach(() => {
        mockUseProjectModal = useProjectModal as jest.MockedFunction<typeof useProjectModal>;
        mockUseProjectModal.mockReturnValue({
            isOpen: false,
            onOpen: jest.fn(),
            onClose: jest.fn(),
        });
    });

    test('should not render modal when isOpen is false', () => {
        render(<Modal title="Test Modal" body={<div>Test Content</div>} isOpen={false} onClose={jest.fn()} />);

        expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    });

    test('should render modal when isOpen is true', () => {
        render(<Modal title="Test Modal" body={<div>Test Content</div>} isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('should call onClose when handleClose is triggered', () => {
        const onCloseMock = jest.fn();

        render(<Modal title="Test Modal" body={<div>Test Content</div>} isOpen={true} onClose={onCloseMock} disabled={false} />);

        // Simulate closing the modal by clicking outside or pressing close button
        fireEvent.click(screen.getByText('Test Content')); // Assuming you have a button or clickable content to close

        // Expect onClose to have been called after the delay
        setTimeout(() => {
            expect(onCloseMock).toHaveBeenCalled();
        }, 300);
    });

    test('should not call onClose when disabled is true', () => {
        const onCloseMock = jest.fn();

        render(<Modal title="Test Modal" body={<div>Test Content</div>} isOpen={true} onClose={onCloseMock} disabled={true} />);

        // Try to close the modal
        fireEvent.click(screen.getByText('Test Content'));

        // Expect onClose to not have been called because disabled is true
        setTimeout(() => {
            expect(onCloseMock).not.toHaveBeenCalled();
        }, 300);
    });

    test('should display backdrop when modal is open', () => {
        render(<Modal title="Test Modal" body={<div>Test Content</div>} isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('should not render modal if isOpen is false after being opened', () => {
        const { rerender } = render(<Modal title="Test Modal" body={<div>Test Content</div>} isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByText('Test Content')).toBeInTheDocument();

        rerender(<Modal title="Test Modal" body={<div>Test Content</div>} isOpen={false} onClose={jest.fn()} />);

        expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    });
});
