import { Page } from "puppeteer";

interface PackageInfo {
    id: string | null;
    name: string;
    nights: number;
    days: number;
  
    inclusions: string[];
    price: number;
  }
  

export const StartPackageScraping  = async(page : Page , pkg:PackageInfo) => {
    
}