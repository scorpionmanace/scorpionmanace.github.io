import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFExportButton: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);

      // Get the About page content
      const aboutContent = document.querySelector('.about-content');
      if (!aboutContent) {
        console.error('About content not found');
        setIsExporting(false);
        return;
      }

      // Generate canvas from the content
      const canvas = await html2canvas(aboutContent as HTMLElement);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // Leave margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      let position = 10; // Start position
      if (imgHeight <= pageHeight - 20) {
        // Single page
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      } else {
        // Multiple pages
        const totalPages = Math.ceil(imgHeight / (pageHeight - 20));

        for (let page = 0; page < totalPages; page++) {
          if (page > 0) {
            pdf.addPage();
            position = 10;
          }

          const sourceY = (canvas.height * page) / totalPages;
          const sourceHeight = canvas.height / totalPages;

          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = canvas.width;
          tempCanvas.height = sourceHeight;
          const tempCtx = tempCanvas.getContext('2d');

          if (tempCtx) {
            tempCtx.drawImage(
              canvas,
              0, sourceY, canvas.width, sourceHeight,
              0, 0, canvas.width, sourceHeight
            );

            const pageImgData = tempCanvas.toDataURL('image/png');
            const pageImgHeight = (sourceHeight * imgWidth) / canvas.width;
            pdf.addImage(pageImgData, 'PNG', 10, position, imgWidth, pageImgHeight);
          }
        }
      }

      // Add footer with page numbers and date
      const pageCount = pdf.internal.pages.length;
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Karan Khare - Resume - Page ${i} of ${pageCount}`, 10, pageHeight - 10);

        // Add generation date
        const currentDate = new Date().toLocaleDateString();
        pdf.text(`Generated on ${currentDate}`, 10, pageHeight - 5);
      }

      // Save PDF
      pdf.save('karan-khare-resume.pdf');

      setIsExporting(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsExporting(false);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      disabled={isExporting}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: isExporting ? 'not-allowed' : 'pointer',
        opacity: isExporting ? 0.7 : 1,
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
        marginBottom: '20px'
      }}
      onMouseEnter={(e) => {
        if (!isExporting) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.3)';
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ opacity: isExporting ? 0.7 : 1 }}
      >
        <path d="M8.5 2H15.5L19 5.5V22H5V2H8.5ZM15 3.5V7H18.5L15 3.5ZM7 4V20H17V9H13V4H7ZM9 12H15V13H9V12ZM9 14H15V15H9V14ZM9 16H13V17H9V16Z"/>
      </svg>
      {isExporting ? 'Generating PDF...' : 'Export PDF'}
    </button>
  );
};

export default PDFExportButton;
