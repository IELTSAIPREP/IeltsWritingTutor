export function exportText(content: string, filename: string = "essay.txt") {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportAsDocx(content: string, filename: string = "essay.docx") {
  // For now, export as text. Could be enhanced with a library like docx
  exportText(content, filename.replace('.docx', '.txt'));
}
