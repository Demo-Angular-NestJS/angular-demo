import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { RootComponent } from '@c/root/root.component';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(RootComponent, config, context);

export default bootstrap;
