// Stary skrypt rejestrujący PWA: teraz tylko wyrejestrowuje istniejące service workery.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}
