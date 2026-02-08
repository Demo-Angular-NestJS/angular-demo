import { EnvironmentProviders } from '@angular/core';
import { provideToastr } from 'ngx-toastr';

export const customProvideToastr = (): EnvironmentProviders => {
  return provideToastr({
    timeOut: 15000,           // How long the toast stays (ms)
    positionClass: 'toast-top-right', // Where it appears
    preventDuplicates: true,  // Avoid spamming the same toast
    progressBar: true,       // Visual countdown timer
    closeButton: true,       // Show an 'X' to close
    countDuplicates: true,   // Shows a number instead of multiple toasts
    progressAnimation: 'decreasing', // How the bar moves
  });
};
