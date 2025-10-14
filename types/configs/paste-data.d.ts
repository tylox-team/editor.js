import { BlockToolAdapter } from "../tools/adapters/block-tool-adapter";
import { PasteEvent } from "../tools/paste-events";
import { SanitizerRule } from "./sanitizer-config";

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


/**
 * Tag substitute object.
 */
interface TagSubstitute {
  /**
   * Name of related Tool
   *
   */
  tool: BlockToolAdapter;

  /**
   * If a Tool specifies just a tag name, all the attributes will be sanitized.
   * But Tool can explicitly specify sanitizer configuration for supported tags
   */
  sanitizationConfig?: SanitizerRule;
}

/**
 * Pattern substitute object.
 */
interface PatternSubstitute {
  /**
   * Pattern`s key
   */
  key: string;

  /**
   * Pattern regexp
   */
  pattern: RegExp;

  /**
   * Name of related Tool
   */
  tool: BlockToolAdapter;
}

/**
 * Files` types substitutions object.
 */
interface FilesSubstitution {
  /**
   * Array of file extensions Tool can handle
   *
   * @type {string[]}
   */
  extensions: string[];

  /**
   * Array of MIME types Tool can handle
   *
   * @type {string[]}
   */
  mimeTypes: string[];
}