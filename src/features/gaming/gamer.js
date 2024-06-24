import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Gamer = (props) => {
    const [textColor, setTextColor] = useState("");


    useEffect(() => {
        if (props.theme === 'dark') {
            setTextColor('text-light')
        } else {
            setTextColor('text-dark')
        }
    }, [props.theme]);
    
    useEffect(() => {
        if (props.theme === 'dark') {
            setTextColor('text-light')
        } else {
            setTextColor('text-dark')
        }
    }, []);


    return ( 
        <div>
            <div className="problem-link">
                <div className="text-center">
                    
                    <h1 className="display-5 author">
                        {props.gamer.name}
                    </h1>

                {props.gamer.steamName !== '' && 
                
                    <p className={textColor}> <i className="fa-brands fa-steam  me-2"></i><span className="">{props.gamer.steamName}</span></p>
                }
                {props.gamer.psnName !== '' &&
 <p className={textColor}><i className="fa-brands fa-playstation  me-2"></i>
 <span className={textColor}>{props.gamer.psnName}</span></p>
                }
                {props.gamer.xboxName !== '' && 
                
                    <p className={textColor}> <i className="fa-brands fa-xbox  me-2"></i><span className="">{props.gamer.xboxName}</span></p>
                }
                {props.gamer.epicName !== '' &&
                <p className={textColor}><img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADzElEQVR4nO2Yy0tbURCHbxeliy666aK7ttBld/kDrnM0opaiKMEn9YWKIilKFuJC6wsUH1hQRAWVigi+tRLQhfhEsQZRRAU3thYrKhhERSLNlBm8l6iJVZrcpHJ/MCRnco/Odx4z51xJ0qVLl66AV1BQ0DsA+CmEQI1sRwgR7jWAyz+IWhoA/PAmAPrDJB3gIc5Ab28vump9fZ39a2trqs/hcODm5iZmZmZe6WO1WrmdnJyMKysreH5+zv6joyMcGBjA4ODgwABQtLGx4RZgaWkJ3am0tFQ7gOnpaUxNTcWEhIQrAK2trdjU1KTOhDsAGnFSe3s7pqWl4dbWFre7urq0A1CCUUwBqKmpYTBF7vqcnp5yOzc3l9vkJ/X09OgAd56B+fl5HsH09PR/noHw8HCMjIzkT79vYgKgwO4DIPyRRi8uLjgQm812BWBvbw/tdruaHgMWwOphE7uqs7PzTgDZ2dlYUlKCGRkZ/gcYHx/HqqoqzMnJ8dgn4LOQuLYUPAGYzWZuj42NaQ9AVZYKVnl5+b0B9vf3uW2z2biYuRa2gMhCfwMYHR29sV+cTueNTe0TgNraWlxcXFStr6+P/f39/TyiBQUFNwDq6ur42cbGRjXvt7S08HGE+tASctfPJwBamqQDPNQZqKiowOXlZZydncWsrCz2mUwmXs9Ku7KyEoeHh/mSQut7cnISo6KicG5uTjWz2YzV1dV8P6B9EBsb63uAvLw8PDs7YwjalPHx8ezv6OhgPwVCbcrppObmZjw4OODvcXFx/FlUVISFhYUMTUcSeqahoQEjIiJ8D9DW1sYZhSrt7u4uBxwaGoqHh4ecbeiaGB0dzQCrq6scoHIDUwCOj4/ZTCYTP0fgOzs72hwl8vPz1RkYHBxkmLKyMvYR0MnJCd/KKLChoSGsr6/nu7ErAF0di4uLMSkpCbu7u3k2tre3eSY02QMU8MLCAq9rWsf0j+kwRr9ZLBYOnvaAUtRiYmLUPTA1NaWaxWLhekCDQEWOftfT6ENNo04/ADi9BgAANj8AfPMagNFofA0AI7fNBL3fmZmZ4VOlJ1FKnZiYwJSUlFtHHgBGZFl+JXlbsiy/FUJ8EUI4PAWQmJjIJ1PltSGJUiv5KI166gcAvwHgKwAYJF8LAF4KIT4DwImngKiY0QWFitv11yXXAj+nQZFl+Y2ktWRZfg4AnwDg8L5rHADsNAiyLL+Q/C2j0fhUCPERAL7fIfhfBB0SEvJMCjQZDIbHAPBBCLHmJvAtggwLC3si/Qd6JIR4L4Tov7T35PN3ULp0PUT9AT/gcQH59SOzAAAAAElFTkSuQmCC"/>
                <span className={textColor}>{props.gamer.epicName}</span></p>
                }
                {props.theme == 'dark' && props.gamer.eaName !== '' &&
                <p className={textColor}><img style={{
                    "width": "4vw",
                    "max-width":"40px"
                    
                }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABJlJREFUeF7tWFuoVVUUHcMixV4GfUiGFUiRUmmkCJWW1EdgEVS+II2brw+RyNKfSIsEjSL6ikqQCgo0CJKoDx+lH6lIkmiZgR+CBZqJlqK9Rnte9ol991lr77X32cb1nDV/Lvfs+RxrrrnmnESPE3s8fkQAYgb0OALxCvR4AsQiGK9AvAI9jkC8Aj2eAPEViFcgXoEeRyBegU4SQNJSAA93oqNAdinJ71vfJd0JYAzJDU3aq50Bkm4G8C2AYU06lOraSHJGJvhLAOwCcD2AW0mebMpmLQAkmdxmANOaciSj5xSAcSSPZgBYBuC19P91ybcFTdmtC8DTyWmsa8qJnJ6FJN/NBD8awIEEgCvS3wTgAZJbm7BfGQBJ1wKwu2l/m6btAO4jaUH2U3L3P3XUmUMA7iB5rlMH6gCwGsCsiob/AHCmRMaCfpLkwUzwZucjj9zLCVArK/rRxl4ZgE4NhspLuhrAdwCu88gYqBOSYmk8tWkwA2A1xmpNEe0AMDV7ZaoiMSgBkDQlqQVfAkHD2iKS71QNvMU/6ACQNBTAXnvvA4OyZ3MsyZ8C+QewDUYAXgLwoiMYu/OnPa/PhqRrnHlBAJA0256mOsoLZH4HsJzk31keSWPT07/MIftKWhQ/9OidTvKzqn4WZoCkGwDszzQhVfX7+J8h+WYu+CEAvko6zHscQj8CuN3efUmbAEx38BxJO0gDN5jKAPAZCzbgYNwDYLLj9BcDeMuj+EGS1npbY2SHYp3h5Q7eN0g+W8U5LwCSipqQKjayvJbyk0h+kzv9kWl6X+NQ/D7JeTn+5QDWOnj/AXA3yZ2hDjoBCGhCQvXn+V4n+Vz+R0kbk6v2uEPpr+n0dywHwKUAdlsj5JDZB+Aukn+GOOkD4FUA83MKrgRghl0UMp7+nJ7+gJZYku0TrN93UR/J9a0Pkqw4tlJ/EoDPPb3C8yRb02MhDkHPoKT8RJZV+h7Jp0LQdpy8BWNF9kaHvGsw+gTAowG2zgK4jeThMt5QAFwTmen+JW1CjpcZcn2XZC+BbZXyZG/++NxG6DEAH1ew8wXJh8r4SwFI+wDf2/sEySpO/eePpIkAvgZg2548rSJpDVE/SboqLZKjygLKfZ9D0jdN9rOWPYNFE9mmpJo/UtGhVkBFRaxt1pf0NoCFNWxZhtoKzf46qQwA30TWtraq4pykFckucY1Dpm3bI+netEEqzVaPD4UrtKI+YGoyam7zZIk1M1uqBJ3hNZtLAAx3yK8n2Zf9XZLd/TEBtm4CsMgD6v0krctsI98zWHUiC/CvlOVEmq51C2rRota7QvMB4JvISqPogGEuyQ86kLdiWbSqd67Q2gCQdEu677cs+L/Ilh/TOtnstBxNVvZF43TbCm0AAJKKJrILBcb5dMP7QxMGShYqNiPYrGAzQz/lASiayJrwz6XjBZK2aW6MSlZqi0nas+oEoKjfb8zBnKLT+dG4CUOSRnhesL9I/uYEoAnDF5uOus3FxRan198IQNccZc1AYgbUBK5rxGIGdM1R1gwkZkBN4LpGLGZA1xxlzUBiBtQErmvEYgZ0zVHWDKTnM+BfBhVjUL9YA30AAAAASUVORK5CYII="/>
                
                     <span className="">{props.gamer.eaName}</span></p>
                }
                {props.theme == 'light' && props.gamer.eaName !== '' &&
                <p className={textColor}><img style={{
                    "width": "4vw",
                    "height": "3.5vh",
                    "max-width":"40px"
                }} src="pngwing.com.png"/>
                
                     <span className="">{props.gamer.eaName}</span></p>
                }
                   
                    
                    
                    
                    
                    <h4>My games: </h4>
                    <p className={textColor}>{props.gamer.games}</p>
                    <div className="blog-date">
                        <p  className="">{props.gamer.date}</p>
                    </div>
                </div> 
            </div>
        </div>
     );
}
 
export default Gamer;