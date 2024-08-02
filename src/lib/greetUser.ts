
function greetUser({ name }: { name: any }) {
    const now = new Date();
  
    const hours = now.getHours();
  
    if (hours >= 0 && hours < 6) {
      return `Good night ${name}`;
    } else {
      return `Good day ${name}`;
    }
  }
  