import { PasteEvent } from "../tools/paste-events";

/**
 * Processed paste data object.
 *
 * @interface PasteData
 */
export interface PasteData {
  /**
   * Name of related Tool
   *
   * @type {string}
   */
  tool: string;

  /**
   * Pasted data. Processed and wrapped to HTML element
   *
   * @type {HTMLElement}
   */
  content: HTMLElement;

  /**
   * Pasted data
   */
  event: PasteEvent;

  /**
   * True if content should be inserted as new Block
   *
   * @type {boolean}
   */
  isBlock: boolean;
}
