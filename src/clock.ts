import {
  action,
  SingletonAction,
  type WillAppearEvent,
} from "@elgato/streamdeck";

@action({ UUID: "lol.plucky.clock" })
export class Clock extends SingletonAction {
  private timeoutId: NodeJS.Timeout | null = null;

  override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
    this.scheduleNextUpdate(ev);
  }

  override onWillDisappear(): void | Promise<void> {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private scheduleNextUpdate(ev: WillAppearEvent): void {
    this.timeoutId && clearTimeout(this.timeoutId);

    ev.action.setTitle(new Date().toLocaleTimeString([], { hour12: false }));

    const now = Date.now();
    const delayToNextSecond = 1000 - (now % 1000);

    this.timeoutId = setTimeout(
      () => this.scheduleNextUpdate(ev),
      delayToNextSecond
    );
  }
}
