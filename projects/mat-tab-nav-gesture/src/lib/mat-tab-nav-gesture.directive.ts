import { Directive, Input } from '@angular/core';
import { MatTabNav } from '@angular/material/tabs';
import { fromEvent } from 'rxjs';
import { tap, switchMap, takeUntil, pairwise } from 'rxjs/operators';

@Directive({
  selector: 'nav[matTabNavBarGesture]',
  standalone: false,
})
export class MatTabNavGestureDirective {
  private headers: any;
  private headersList: any;
  private originalHeadersListTransition?: string;
  private headersMaxScroll?: number;

  @Input('swipeLimitWidth') swipeLimitWidth = 80;

  constructor(private tabGroup: MatTabNav) {}

  ngOnInit(): void {
    this.headers = this.tabGroup._tabListContainer.nativeElement;
    if (!this.headers) {
      throw new Error('No headers found in DOM! Aborting...');
    }

    this.headersList = this.tabGroup._tabList.nativeElement;
    if (!this.headersList) {
      throw new Error('No headers list found in DOM! Aborting...');
    }

    this._handleHeadersEvents();
  }

  private _handleHeadersEvents(): void {
    // this will capture all touchstart events from the headers element
    fromEvent(this.headers, 'touchstart')
      .pipe(
        tap(() => {
          this.originalHeadersListTransition =
            this.headersList.style.transition;
          this.headersList.style.transition = 'none';
          this.headersMaxScroll =
            -1 * (this.headersList.offsetWidth - this.headers.offsetWidth + 64);
        }),
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(this.headers, 'touchmove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(
              fromEvent(this.headers, 'touchend').pipe(
                tap(
                  () =>
                    (this.headersList.style.transition =
                      this.originalHeadersListTransition)
                )
              )
            ),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res: [any, any]) => {
        const rect = this.headers.getBoundingClientRect();
        // previous and current position with the offset
        const prevX = res[0].touches[0].clientX - rect.left;

        const currentX = res[1].touches[0].clientX - rect.left;

        this._scrollHeaders(currentX - prevX);
      });
  }

  private _scrollHeaders(scrollX: number): void {
    if (!this.headersList || !this.headersMaxScroll) {
      return;
    }
    const currentTransform = this.headersList.style.transform;
    let currentScroll: number;
    if (currentTransform && currentTransform.indexOf('translateX') > -1) {
      let tmp = currentTransform.substring('translateX('.length);
      tmp = tmp.substring(0, tmp.length - 'px)'.length);
      currentScroll = parseInt(tmp, 10);
    } else {
      currentScroll = 0;
    }
    let newScroll = currentScroll + scrollX;
    if (newScroll > 0) {
      newScroll = 0;
    }
    if (newScroll < this.headersMaxScroll) {
      newScroll = this.headersMaxScroll;
    }
    // this._renderer.setStyle(this._headersList, 'transform', `translateX(${newScroll}px)`);
    this.headersList.style.transform = `translateX(${newScroll}px)`;
  }
}
