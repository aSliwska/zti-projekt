package zti.projekt.server;

import java.util.Arrays;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class Logger {
    @Pointcut("execution(public * zti.projekt.server.control.PatientController.*(..))")
    private void patientController() { }

    @Around(value = "patientController()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        String methodName = joinPoint.getSignature().getName();
        log.info(">> {}() - {}", methodName, Arrays.toString(args));
        Object result = joinPoint.proceed();
        log.info("<< {}() - {}", methodName, result);
        return result;
    }
}
